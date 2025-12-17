import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, type WaitlistInsert } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      email,
      language_preference = 'sr',
      user_type = 'homeowner',
      referral_code,
      utm_source,
      utm_medium,
      utm_campaign
    } = body;

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'invalid_email', message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Get client info
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    const supabase = createServerClient();

    // Check if Supabase is configured
    if (!supabase) {
      // Fallback to mock response for development
      console.log('Supabase not configured, using mock response');
      const mockReferralCode = Math.random().toString(36).substring(2, 10).toUpperCase();
      return NextResponse.json({
        success: true,
        referralCode: mockReferralCode,
        message: 'Successfully joined the waitlist (dev mode)',
      });
    }

    // Prepare insert data
    const insertData: WaitlistInsert = {
      email: email.toLowerCase().trim(),
      language_preference,
      user_type,
      referral_code: referral_code || null,
      utm_source: utm_source || null,
      utm_medium: utm_medium || null,
      utm_campaign: utm_campaign || null,
      ip_address: ip !== 'unknown' ? ip : null,
      user_agent: userAgent !== 'unknown' ? userAgent : null,
    };

    // Insert into waitlist
    const { data, error } = await supabase
      .from('waitlist')
      .insert(insertData)
      .select('own_referral_code')
      .single();

    if (error) {
      // Check for duplicate email
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'duplicate', message: 'Email already registered' },
          { status: 409 }
        );
      }

      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'server_error', message: 'Failed to join waitlist' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      referralCode: data.own_referral_code,
      message: 'Successfully joined the waitlist',
    });
  } catch (error) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'server_error', message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = createServerClient();

    // Check if Supabase is configured
    if (!supabase) {
      return NextResponse.json({ count: 0, configured: false });
    }

    // Get waitlist count
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Error fetching count:', error);
      return NextResponse.json({ count: 0, error: error.message });
    }

    return NextResponse.json({ count: count || 0, configured: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ count: 0, error: 'Failed to fetch count' });
  }
}
