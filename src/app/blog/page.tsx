import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockBlogPosts } from "@/lib/mock-data";
import { ArrowRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function BlogPage() {
  const publishedPosts = mockBlogPosts.filter(p => p.status === 'published');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section - Professional & Simple Redesign */}
        <section className="relative bg-white pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                  <Calendar className="mr-2 h-4 w-4" /> Blog
                </div>
                <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] animate-in fade-in slide-in-from-left-8 duration-1000">
                  Votre santé, <br />
                  <span className="text-primary">notre passion.</span>
                </h1>
                <p className="mt-8 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                  Retrouvez tous les conseils, actualités et astuces de nos experts pour prendre soin de vous et de vos proches au quotidien.
                </p>
                <div className="mt-8 flex justify-center lg:justify-start animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                  <div className="h-1.5 w-24 bg-primary rounded-full shadow-sm"></div>
                </div>
              </div>
              <div className="flex-1 relative w-full max-w-2xl lg:max-w-none animate-in fade-in zoom-in duration-1000 delay-200">
                <div className="relative aspect-video sm:aspect-[4/3] overflow-hidden rounded-3xl lg:rounded-[3rem] shadow-2xl shadow-slate-200 ring-8 ring-slate-50">
                  <Image
                    src="https://picsum.photos/seed/health-blog/800/600"
                    alt="Blog Santé"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="absolute -top-12 -right-12 -z-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {publishedPosts.map((post) => (
                <Card key={post.blogId} className="flex flex-col overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl">
                  <CardHeader className="p-0">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      width={800}
                      height={600}
                      className="h-60 w-full object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <CardTitle className="font-headline text-2xl leading-tight">
                      <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </CardTitle>
                    <p className="mt-4 text-muted-foreground flex-1">{post.content.substring(0, 100)}...</p>
                    <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4"/>
                            <span>{post.authorName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4"/>
                            <time dateTime={post.publishDate.toISOString()}>
                                {format(post.publishDate, "d MMMM yyyy", { locale: fr })}
                            </time>
                        </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button asChild variant="link" className="p-0 text-primary">
                      <Link href={`/blog/${post.slug}`}>
                        Lire la suite <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
