import { NextRequest, NextResponse } from 'next/server';
import { semanticCommitValidatePrompt } from '@/utils/constants';

export async function GET(request: NextRequest) {
  const apiKey = request.nextUrl.searchParams.get('apiKey');
  const commitMessage = request.nextUrl.searchParams.get('commitMessage');
  const purpose = request.nextUrl.searchParams.get('purpose') || undefined;

  if (!apiKey || !commitMessage)
    return NextResponse.json(
      {
        message: 'API Key and Commit Message is required.',
        status: 'error',
      },
      {
        status: 500,
      },
    );

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: semanticCommitValidatePrompt(commitMessage, purpose) }],
            },
          ],
        }),
      },
    );

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

    const replacedData = data?.candidates?.[0]?.content?.parts?.[0]?.text
      .replace(/```json\s*/g, '')
      .replace(/```/g, '')
      .replace(/\n/g, '')
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
