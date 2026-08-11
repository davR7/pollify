import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { formatDate } from "@/libs/format-date";
import { getPollsWithUser } from "@/services/poll.service";
import { PollCard } from "../components/poll-card";

export function MyPollsPage() {
  const { data: output } = useQuery({
    queryKey: ["pollsWithUser"],
    queryFn: getPollsWithUser,
  });

  return (
    <Container className="flex-1">
      <SectionHeader title="Suas Enquetes" description="Sua opinião já pode ser compartilhada?" />
      <Grid>
        {output?.polls.map((poll) => (
          <PollCard
            key={poll.id}
            id={poll.id}
            title={poll.title}
            startsAt={formatDate(poll.startsAt)}
            endAt={formatDate(poll.endsAt)}
          />
        ))}
      </Grid>
    </Container>
  );
}
