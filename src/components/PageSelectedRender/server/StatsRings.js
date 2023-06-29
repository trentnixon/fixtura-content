// APIS
import { RenderCount } from "@/api/renders";
import { SelectedRenderStatsRingsClient } from "../client/StatsRings";
export async function SelectedRenderStatsRings({ params }) {
  const Count = await RenderCount(params.render);

  return <SelectedRenderStatsRingsClient Count={Count} />;
}
