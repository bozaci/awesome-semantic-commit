import { NextRequest, NextResponse } from 'next/server';
import { commitGeneratePrompt } from '@/utils/constants';

export async function GET(request: NextRequest) {
  const apiKey = request.nextUrl.searchParams.get('apiKey');
  const summary = request.nextUrl.searchParams.get('summary');

  if (!apiKey || !summary)
    return NextResponse.json(
      {
        message: 'API Key and Summary is required.',
        status: 'error',
      },
      {
        status: 500,
      },
    );

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: commitGeneratePrompt(summary) }],
        temperature: 0.7,
      }),
    });

    //
    // The reason why the code here is a comment line:
    // When the API key is not valid, the message ‘API call failed.’ is returned to the user, which does not make it clear to the user where the error is, so it had to be disabled here.
    //
    // if (!response.ok)
    //   return NextResponse.json(
    //     {
    //       message: `API call failed.`,
    //       status: 'error',
    //     },
    //     {
    //       status: response.status,
    //     },
    //   );

    const data = await response.json();

    if (data?.error)
      return NextResponse.json(
        {
          message: data.error.message,
          status: 'error',
        },
        {
          status: 500,
        },
      );

    const replacedData = data?.choices[0].message.content
      .replace(/```json\s*/g, '')
      .replace(/```/g, '')
      .replace(/'/g, '"');

    let parsedData;
    try {
      parsedData = JSON.parse(replacedData);
    } catch (err) {
      return NextResponse.json(
        {
          message: `Failed to JSON parse: ${err}`,
          status: 'error',
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        body: parsedData,
        status: 'success',
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: err || 'An unkown error occurred',
        status: 'error',
      },
      {
        status: 500,
      },
    );
  }
}
