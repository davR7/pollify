import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDate } from "@/libs/format-date";
import { getPolls } from "@/services/poll.service";
import { PollCard } from "../components/poll-card";

export function PollsPage() {
  const { data: output } = useQuery({
    queryKey: ["polls"],
    queryFn: getPolls,
  });

  return (
    <Container className="flex-1">
      <SectionHeader title="Enquetes" description="Participe das enquetes da comunidade." />
      <Grid>
        {output?.polls?.map((poll) => (
          <PollCard
            key={poll.id}
            id={poll.id}
            title={poll.title}
            author={poll.user.fullname}
            startsAt={formatDate(poll.startsAt)}
            endAt={formatDate(poll.endsAt)}
          />
        ))}
      </Grid>
    </Container>
  );
}
