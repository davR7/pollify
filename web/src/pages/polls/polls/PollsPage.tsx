import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPollsWithUser } from "@/services/poll.service";
import { PollCard } from "../components/poll-card";

export function PollsPage() {
  const { data: output } = useQuery({
    queryKey: ["polls", "all"],
    queryFn: getPollsWithUser,
  });

  return (
    <Container className="flex-1">
      <SectionHeader title="Enquetes" description="Participe das enquetes da comunidade." />
      <Grid>
        {output?.polls?.map((poll) => (
          <PollCard key={poll.id} poll={poll} />
        ))}
      </Grid>
    </Container>
  );
}
