import { notFound } from "next/navigation";
import { getCmsContent } from "@/lib/cms";
import { ServiceDetailView } from "@/components/service-detail-view";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getCmsContent().then(({ services }) => services.map((service) => ({ slug: service.slug })));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { services } = await getCmsContent();
  const service = services.find((item) => item.slug === slug);
  return { title: service?.name ?? "Service" };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const { services } = await getCmsContent();
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();

  return <ServiceDetailView service={service} />;
}
