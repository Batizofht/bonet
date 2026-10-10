import PageLoader from "../components/PageLoader";

// Route-level loading state: shown automatically while any page's
// RSC payload streams in during client-side navigation.
export default function Loading() {
  return <PageLoader />;
}
