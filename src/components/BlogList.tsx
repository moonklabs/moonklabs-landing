"use client";

import Link from "next/link";
import { useState } from "react";
import { categoryStyle, type Post, type PostCategory } from "@/content/posts";

const TABS: Array<"전체" | PostCategory> = ["전체", "소식", "도입 가이드", "운영 사례", "엔지니어링"];

function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${y}년 ${Number(m)}월 ${Number(d)}일`;
}

export default function BlogList({ posts }: { posts: Post[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("전체");
  const filtered = tab === "전체" ? posts : posts.filter((p) => p.category === tab);
  const [featured, ...rest] = filtered;

  return (
    <div className="space-y-8">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="카테고리 필터">
        {TABS.map((t) => {
          const active = t === tab;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all ${
                active ? "text-white" : "text-zinc-500 bg-white hover:text-black"
              }`}
              style={
                active
                  ? { background: "#1C1B17" }
                  : { border: "1px solid rgba(28,27,23,0.10)" }
              }
            >
              {t}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-zinc-400 py-16 text-center">이 카테고리의 글이 아직 없습니다.</p>
      ) : (
        <>
          {/* Featured post */}
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group block rounded-3xl bg-white p-8 lg:p-12 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(28,27,23,0.10)]"
              style={{ border: "1px solid rgba(28,27,23,0.08)", boxShadow: "0 2px 10px rgba(28,27,23,0.03)" }}
            >
              <div className="max-w-3xl space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <span
                    className={`px-3 py-1 rounded-full font-medium ${categoryStyle[featured.category].text}`}
                    style={{ background: categoryStyle[featured.category].bg }}
                  >
                    {featured.category}
                  </span>
                  <span className="text-zinc-400">{formatDate(featured.date)}</span>
                  <span className="text-zinc-300">·</span>
                  <span className="text-zinc-400">{featured.readingMinutes}분 읽기</span>
                </div>
                <h2
                  className="font-display font-bold group-hover:text-violet-800 transition-colors"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.015em", lineHeight: 1.25, color: "#1C1B17" }}
                >
                  {featured.title}
                </h2>
                <p className="text-zinc-500 text-[15px] leading-relaxed">{featured.description}</p>
                <span className="inline-block text-sm font-medium text-violet-700 pt-1">읽어보기 →</span>
              </div>
            </Link>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col gap-4 rounded-2xl bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_48px_rgba(28,27,23,0.10)]"
                  style={{ border: "1px solid rgba(28,27,23,0.08)", boxShadow: "0 2px 10px rgba(28,27,23,0.03)" }}
                >
                  <div className="flex items-center gap-3 text-xs">
                    <span
                      className={`px-3 py-1 rounded-full font-medium ${categoryStyle[post.category].text}`}
                      style={{ background: categoryStyle[post.category].bg }}
                    >
                      {post.category}
                    </span>
                    <span className="text-zinc-400">{formatDate(post.date)}</span>
                  </div>
                  <h2
                    className="font-display text-xl font-bold leading-snug group-hover:text-violet-800 transition-colors"
                    style={{ letterSpacing: "-0.01em", color: "#1C1B17" }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-zinc-500 text-sm leading-relaxed flex-1">{post.description}</p>
                  <span className="text-xs text-zinc-400">{post.readingMinutes}분 읽기</span>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
