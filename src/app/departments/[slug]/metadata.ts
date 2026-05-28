import { Metadata } from "next";

export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
  // You can fetch data here to generate dynamic metadata based on the slug
  return {
    title: `HIMTI UIN Jakarta - ${params.slug.charAt(0).toUpperCase() + params.slug.slice(1)} Department`,
    description: `Information about the ${params.slug} department at HIMTI UIN Jakarta`,
  };
}; 