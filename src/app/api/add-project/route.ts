import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, logoURL, website, githubRepoURL, projectOwner } = await request.json();
    const airtableBaseId = process.env.AIRTABLE_BASE_ID;
    const airtableBaseName = process.env.AIRTABLE_BASE_NAME;
    const airtableApiToken = process.env.AIRTABLE_API_TOKEN;

    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${airtableBaseId}/${airtableBaseName}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${airtableApiToken}`,
          },
          body: JSON.stringify({
            fields: {
              Name: name,
              'Logo URL': logoURL,
              Website: website,
              'GitHub Repo URL': githubRepoURL,
              'Project Owner': projectOwner,
            },
          }),
        },
      );

      if (!response.ok)
        return NextResponse.json(
          {
            status: 'error',
            message: 'Failed to make an API request.',
          },
          {
            status: 500,
          },
        );

      const data = await response.json();

      if (!data?.fields)
        return NextResponse.json(
          {
            status: 'error',
            message: 'An error occurred while adding the project.',
          },
          { status: 500 },
        );

      return NextResponse.json(
        {
          status: 'success',
          message: 'Successfully added the project.',
        },
        {
          status: 200,
        },
      );
    } catch (err) {
      return NextResponse.json(
        {
          status: 'error',
          message: err || 'Failed to make an API request.',
        },
        {
          status: 500,
        },
      );
    }
  } catch (err) {
    return NextResponse.json(
      {
        status: 'error',
        message: err || 'Failed to get body parameters.',
      },
      {
        status: 500,
      },
    );
  }
}
