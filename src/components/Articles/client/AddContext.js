import { P, S } from "@/components/Type/Paragraph";
import { Button, Group, Textarea } from "@mantine/core";

export const AddContext = ({
  setGameContext,
  gameContext,
  handleSubmit,
  isLoading,
}) => {
  return (
    <>
      <P fz={"xl"} fw={600} lh={"2.2"}>
        Add Fixture context.
      </P>
      <P lh={"1.3"}>
        Enrich this fixture with more nuanced details that go beyond the
        scorecard. Share specific player contributions, highlight distinctive
        match features, or mention the purpose behind the event.
      </P>

      <Textarea
        placeholder="Add game context to this Fixture"
        autosize
        minRows={10}
        maxRows={20}
        maxLength={1000}
        my={20}
        value={gameContext}
        onChange={(e) => setGameContext(e.target.value)}
      />
      <P
        fz={"xs"}
        c={gameContext.length <= 900 ? "green.5" : "red.5"}
        ta={"right"}
      >
        {1000 - gameContext.length} characters remaining
      </P>
      <P lh={"2.1"}>
        NB : Any context added here will be applyed to any rewrites for this
        fixture.
      </P>
      <S>
        Hint: Add contextual items as a list to provide more insights into the
        fixture.
      </S>
      <S>
        For example: This was a day-night game. Player Name scored a lot of runs
        through cover. This was Player Name&apos;s 50th game for the club. There
        were 3 rain delays during this game.
      </S>
      <Group position="right" my={10}>
        <Button
          onClick={() => {
            handleSubmit(false);
          }}
          disabled={isLoading}
          variant="default"
          radius="md"
          size="md"
          sx={(theme) => ({
            borderRadius: theme.radius.md,
            borderColor: theme.colors.blue[6],
            color: theme.colors.blue[6],
            cursor: "pointer",
            "&:hover": {
              background: theme.fn.linearGradient(
                45,
                theme.colors.green[5],
                theme.colors.cyan[5]
              ),
              color: theme.colors.gray[0],
              borderColor: theme.colors.blue[6],
            },
          })}
        >
          {isLoading ? "Submitting..." : "Save"}
        </Button>
        <Button
          onClick={() => {
            handleSubmit(true);
          }}
          disabled={isLoading}
          variant="default"
          radius="md"
          size="md"
          sx={(theme) => ({
            borderRadius: theme.radius.md,
            borderColor: theme.colors.green[6],
            color: theme.colors.green[6],
            cursor: "pointer",
            "&:hover": {
              background: theme.fn.linearGradient(
                45,
                theme.colors.blue[5],
                theme.colors.green[5]
              ),

              color: theme.colors.gray[0],
              borderColor: theme.colors.blue[6],
            },
          })}
        >
          {isLoading ? "Submitting..." : "Save and Apply"}
        </Button>
      </Group>
    </>
  );
};
