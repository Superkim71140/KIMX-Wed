import ArticleDetailView from './ArticleDetailView';
export { generateStaticParams, generateMetadata } from './ArticleDetailView';

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <ArticleDetailView params={params} />;
}
