import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getMyPolls } from "@/services/poll.service";
import type { FormPoll } from "@/types/poll.types";
import { PollCard } from "../components/poll-card";
import { UpdatePollModal } from "./components/update-poll-modal";

export function MyPollsPage() {
  const [selectedPoll, setSelectedPoll] = useState<FormPoll | null>(null);

  const { data: output } = useQuery({
    queryKey: ["polls", "me"],
    queryFn: getMyPolls,
  });

  return (
    <Container className="flex-1">
      <SectionHeader title="Suas Enquetes" description="Sua opinião já pode ser compartilhada?" />
      <Grid>
        {output?.polls.map((poll) => (
          <PollCard
            poll={poll}
            key={poll.id}
            showAuthor={false}
            onEdit={() => setSelectedPoll(poll)}
          />
        ))}
      </Grid>
      {selectedPoll && (
        <UpdatePollModal onClose={() => setSelectedPoll(null)} poll={selectedPoll} />
      )}
    </Container>
  );
}
