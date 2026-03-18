"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const pageSize = 3;

const ExibitionCard = ({ mainImage, title, date, slug }) => {
  return (
    <Link href={`/exhibition/${slug.current}`} className="p-4 w-[300px] rounded-xl bg-secondary shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={mainImage}
        alt={title}
        className="w-[250px] mx-auto"
        loading="lazy"
      />
      <div className="flex flex-col mt-2 gap-2">
        <p className="text-gray-600 mt-2">
          {new Date(date).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}

        </p>
        <h3 className="text-xl font-semibold text-[#10797C] mt-2">{title}</h3>
      </div>
    </Link>
  );
};

export default function ExhibitionClient({
  initialData,
  pastExhibitionsInitial,
  upComingExhibitionsInitial,
}) {
  const [exhibitions, setExhibitions] = useState(initialData);
  const [pastExhibitions, setPastExhibitions] = useState(
    pastExhibitionsInitial
  );
  const [upComingExhibitions, setUpComingExhibitions] = useState(
    upComingExhibitionsInitial
  );

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef();


  const fetchMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const more = await client.fetch(
      `*[_type == "exhibition"] | order(date desc)[$start...$end]{
        _id,
        title,
        date,
        slug,
        mainImage { asset-> { url } },
        
      }`,
      {
        start: exhibitions.length,
        end: exhibitions.length + pageSize,
      }
    );

    if (more.length < pageSize) setHasMore(false);
    const newPastExibitions = more.filter(
      (ex) => new Date(ex.date) < new Date()
    );
    const newUpComingExibitions = more.filter(
      (ex) => new Date(ex.date) > new Date()
    );

    setPastExhibitions([...pastExhibitions, ...newPastExibitions]);
    setUpComingExhibitions([...upComingExhibitions, ...newUpComingExibitions]);

    setLoading(false);
  }, [exhibitions, hasMore, loading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMore();
        }
      },
      { threshold: 1.0 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [fetchMore]);

  return (
    <div className="pt-16 px-8 md:px-20">
      {upComingExhibitions.length > 0 && (
        <>
          <h2 className="text-5xl max-md:text-4xl font-medium text-center accent-sec">Upcoming Exhibitions</h2>

          <div className="grid gap-10">
            {upComingExhibitions.map((ex) => (
              <ExibitionCard
                key={ex._id}
                mainImage={ex.mainImage.asset.url}
                title={ex.title}
                date={ex.date}
                slug={ex.slug}
              />
            ))}
          </div>
        </>
      )}

      <h2 className="text-5xl max-md:text-4xl font-medium text-center accent-sec my-10">Past Exhibitions</h2>

      <div className="grid gap-10">
        {pastExhibitions.map((ex) => (
          <ExibitionCard
            key={ex._id}
            mainImage={ex.mainImage.asset.url}
            title={ex.title}
            date={ex.date}
            slug={ex.slug}
          />
        ))}
      </div>

      {loading && <span className="loader mx-auto block mt-10" />}
      <div ref={loaderRef} className="h-12" />
    </div>
  );
}
