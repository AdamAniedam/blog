import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const posts = await prisma.post.findMany();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}


export async function POST(request) {
  const { title, content } = await request.json();

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
