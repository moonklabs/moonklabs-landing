"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { categoryStyle, postImage, type Post } from "@/content/posts";

function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}

export default function InsightsSection({ posts }: { posts: Post[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="insights"
      ref={ref}
      aria-labelledby="insights-heading"
      className="py-28 px-6"
      style={{ borderBottom: "1px solid rgba(28,27,23,0.08)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="inline-block text-xs tracking-widest text-violet-700 font-medium px-4 py-1.5 rounded-full"
              style={{ background: "rgba(124,58,237,0.07)" }}
            >
              NEWS &amp; INSIGHTS
            </motion.span>
            <motion.h2
              id="insights-heading"
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold"
              style={{ fontSize: "clamp(2rem, 3.8vw, 3rem)", letterSpacing: "-0.02em", lineHeight: 1.2, color: "#1C1B17" }}
            >
              뭉클랩의 소식과 인사이트
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full bg-white hover:-translate-y-0.5 transition-all"
              style={{ border: "1px solid rgba(28,27,23,0.14)", color: "#1C1B17" }}
            >
              블로그 전체 보기 →
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {posts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-4 h-full rounded-2xl bg-white p-6 pb-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(28,27,23,0.10)]"
                style={{ border: "1px solid rgba(28,27,23,0.08)", boxShadow: "0 2px 10px rgba(28,27,23,0.03)" }}
              >
                <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
                  <Image
                    src={postImage(post)}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-center gap-2.5 text-xs">
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${categoryStyle[post.category].text}`}
                    style={{ background: categoryStyle[post.category].bg }}
                  >
                    {post.category}
                  </span>
                  <span className="text-zinc-400">{formatDate(post.date)}</span>
                </div>
                <h3
                  className="font-display text-lg font-bold leading-snug group-hover:text-violet-800 transition-colors"
                  style={{ letterSpacing: "-0.01em", color: "#1C1B17" }}
                >
                  {post.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed flex-1">{post.description}</p>
                <span className="text-xs text-zinc-400">{post.readingMinutes}분 읽기</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
