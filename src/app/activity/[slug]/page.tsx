import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Clock,
  Mountain,
  Waves,
  TreePine,
  Eye,
  ArrowLeft,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { activities, getActivityBySlug, type Activity } from "@/data/activities";

const catIcons: Record<string, React.ElementType> = {
  Water: Waves,
  Jungle: TreePine,
  Culture: Mountain,
  Wildlife: Eye,
};

// Generate static params for all activities
export function generateStaticParams() {
  return activities.map((activity) => ({
    slug: activity.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const activity = getActivityBySlug(params.slug);
  if (!activity) return { title: "Activity Not Found" };
  return {
    title: `${activity.title} | Belum Platform`,
    description: activity.description,
  };
}

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);
  if (!activity) notFound();

  const Icon = catIcons[activity.category] || Mountain;

  // Get related activities (same category, excluding current)
  const related = activities
    .filter((a) => a.category === activity.category && a.id !== activity.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero image */}
      <section className="relative h-[50vh] min-h-[360px] bg-navy-950">
        <Image
          src={activity.image}
          alt={activity.title}
          fill
          className="object-cover opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/activities"
              className="mb-4 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> All Activities
            </Link>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                <Icon className="h-3 w-3" />
                {activity.category}
              </span>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  activity.difficulty === "Easy"
                    ? "bg-emerald-500/20 text-emerald-300"
                    : activity.difficulty === "Moderate"
                      ? "bg-amber-500/20 text-amber-300"
                      : "bg-rose-500/20 text-rose-300"
                }`}
              >
                {activity.difficulty}
              </span>
            </div>
            <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">
              {activity.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h2 className="mb-4 font-display text-xl font-bold text-navy-900">
                About This Activity
              </h2>
              <p className="leading-relaxed text-slate-600">
                {activity.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick facts */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h3 className="mb-4 font-display text-lg font-bold text-navy-900">
                Quick Facts
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Duration</p>
                    <p className="font-medium text-navy-900">
                      {activity.duration}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Price</p>
                    <p className="font-medium text-navy-900">
                      {activity.included ? (
                        <span className="text-emerald-600">
                          Included in package
                        </span>
                      ) : (
                        <>RM {activity.price} per group</>
                      )}
                    </p>
                  </div>
                </div>

                {activity.included && (
                  <div className="flex items-start gap-3 rounded-xl bg-emerald-50 p-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <p className="text-sm text-emerald-800">
                      This activity is included in standard houseboat
                      packages at no extra cost.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-2xl bg-navy-950 p-6 text-center">
              <p className="text-sm text-slate-400">
                Ready to experience this?
              </p>
              <Link
                href="/search"
                className="mt-4 inline-block w-full rounded-xl bg-blue-600 py-3 font-bold text-white transition hover:bg-blue-500"
              >
                Browse Houseboats
              </Link>
            </div>
          </div>
        </div>

        {/* Related activities */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 font-display text-2xl font-bold text-navy-900">
              More {activity.category} Activities
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((rel) => {
                const RelIcon = catIcons[rel.category] || Mountain;
                return (
                  <Link key={rel.id} href={`/activity/${rel.slug}`}>
                    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:shadow-lg">
                      <div className="relative aspect-[4/3] bg-slate-100">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-navy-900 backdrop-blur-sm">
                          <RelIcon className="h-3 w-3" />
                          {rel.category}
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-lg font-bold text-navy-900 transition group-hover:text-blue-600">
                          {rel.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                          {rel.description}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {rel.duration}
                          </span>
                          <span className="font-display font-bold text-navy-900">
                            {rel.included ? (
                              <span className="text-emerald-600">Included</span>
                            ) : (
                              <>RM {rel.price}</>
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
