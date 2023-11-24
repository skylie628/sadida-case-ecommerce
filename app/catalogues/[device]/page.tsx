import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import { defaultSort, sorting } from "@/lib/constants";
import { getProducts } from "@/lib/sadida";
import { getSadidaProducts } from "@/lib/sadida";
export const runtime = "edge";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function CataloguesPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  console.log(searchParams);
  const searchValue = "";
  const { device } = searchParams as { [key: string]: string };
  //const products = await getProducts({ sortKey, reverse, query: searchValue });
  const products =
    (await getSadidaProducts({
      pageIndex: 1,
      catalogues: device,
      sortBy: "best_rating",
    })) || [];
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? "There are no products that match "
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products?.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
