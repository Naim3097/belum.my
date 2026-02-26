"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Host } from "@/data/hosts";

// Shared lake activities — all operators are on Temenggor Lake / Royal Belum
const baseActivities = [
  {
    title: "Bamboo Rafting",
    description:
      "Navigate the calm waters on traditional bamboo rafts, connecting with the ancient ways of the river.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Royal_Belum_State_Park_on_a_sunny_day.jpg/1280px-Royal_Belum_State_Park_on_a_sunny_day.jpg",
    slug: "bamboo-rafting",
  },
  {
    title: "Jungle Trekking",
    description:
      "Walk among giants. Discover the hidden waterfalls and the elusive Rafflesia in the heart of Belum.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Twin_Flow_of_Kooi_Waterfall%2C_Royal_Belum_Rainforest.jpg/720px-Twin_Flow_of_Kooi_Waterfall%2C_Royal_Belum_Rainforest.jpg",
    slug: "jungle-trekking",
  },
  {
    title: "Sport Fishing",
    description:
      "Challenge the legendary Toman (Giant Snakehead) in one of Southeast Asia's premier fishing destinations.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Land_and_Sea_Royal_Belum_State_Park.jpg/960px-Land_and_Sea_Royal_Belum_State_Park.jpg",
    slug: "sport-fishing",
  },
  {
    title: "Cultural Immersion",
    description:
      "Visit the Orang Asli villages. Experience the Sewang cultural dance and learn their harmonious way of life.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Kampung_Orang_Asli_Sungai_Chendon_1.jpg/1280px-Kampung_Orang_Asli_Sungai_Chendon_1.jpg",
    slug: "orang-asli-village-visit",
  },
];

interface Props {
  host: Host;
}

export default function LandingActivities({ host }: Props) {
  return (
    <section id="activities" className="py-32 bg-forest-900 text-stone-50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="text-earth-600 tracking-widest uppercase text-sm mb-6 block">
              The Ecosystem
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-50 leading-tight">
              Engage with the wild.
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 md:mt-0"
          >
            <p className="text-stone-400 max-w-md text-lg">
              Our activities are not mere excursions; they are invitations to
              participate in the rhythm of the rainforest.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {baseActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative h-[400px] overflow-hidden"
            >
              <Link href={`/activity/${activity.slug}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-900/90 via-forest-900/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                <div className="absolute bottom-0 left-0 w-full p-10 transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-3xl font-serif text-stone-50 mb-3">
                    {activity.title}
                  </h3>
                  <p className="text-stone-300 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {activity.description}
                  </p>
                  <div className="mt-6 flex items-center gap-3 text-earth-600 uppercase tracking-widest text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                    Explore <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-stone-400 mb-8 max-w-2xl mx-auto text-lg">
            Also available: Kayaking, Water Tubing, Sunset Viewing, Animal Salt
            Lick Experience, Star Gazing, Morning Safari, Bird Watching, and
            Campsite Setup.
          </p>
          <Link
            href="/activities"
            className="px-8 py-4 border border-earth-600 text-earth-600 uppercase tracking-widest text-sm hover:bg-earth-600 hover:text-stone-50 transition-colors inline-block"
          >
            View Full Activity List
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
