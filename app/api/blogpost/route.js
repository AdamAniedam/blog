import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const blogPosts = await prisma.blogPost.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(blogPosts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}


export async function POST(request) {
  const { title, description } = await request.json();

  try {
    const newBlogPost = await prisma.blogPost.create({
      data: {
        title,
        description,
      },
    });
    return NextResponse.json(newBlogPost);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create blog post' }, { status: 500 });
  }
}
