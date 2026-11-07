import { ogContentType, ogSize, renderOgImage } from '@/lib/og';
import { site } from '@/lib/site';

export const alt = `Master thesis by ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    eyebrow: 'Master thesis',
    title: 'Adapting Stream-Based State-Machine Replication to Apache Flink (Gumti)',
    summary: 'A full realization of the TARA protocol as a distributed Apache Flink job.',
    tags: ['Apache Flink', 'Java', 'ZooKeeper', 'Distributed systems'],
  });
}
