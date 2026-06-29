import NewsCategoryView from './NewsCategoryView';
export { generateStaticParams, generateMetadata } from './NewsCategoryView';

export default function Page({ params }: { params: Promise<{ category: string }> }) {
  return <NewsCategoryView params={params} />;
}
