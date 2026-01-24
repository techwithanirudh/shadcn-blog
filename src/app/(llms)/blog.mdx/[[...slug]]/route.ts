import { type NextRequest, NextResponse } from 'next/server';
import { getBlogLLMText } from '@/lib/get-llm-text';
import { post } from '@/lib/source';
import { notFound } from 'next/navigation';

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: RouteContext<'/blog.mdx/[[...slug]]'>,
) {
  const slug = (await params).slug;
  const page = post.getPage(slug);
  if (!page) notFound();

  return new NextResponse(await getBlogLLMText(page), {
    headers: {
      'Content-Type': 'text/markdown',
    },
  });
}

export function generateStaticParams() {
  return post.generateParams();
}