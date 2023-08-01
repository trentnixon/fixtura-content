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
      <Textarea
        placeholder="Add game context to this Fixture"
        label="Add Context"
        description={`With the "Add Context" feature, you can enrich this fixture with more nuanced details that go beyond the scorecard. Share specific player contributions, highlight distinctive match features, or mention the purpose behind the event. Customize the writeup to make it even more unique and engaging with Fixtura's "Add Context" feature.`}
        autosize
        minRows={10}
        value={gameContext}
        onChange={(e) => setGameContext(e.target.value)}
      />
      <S>
        Hint: Add contextual items as a list to provide more insights into the
        fixture.
      </S>
      <S>For example: This was a day-night game. Player Name scored a lot of runs through
        cover. This was Player Name's 50th game for the club. There were 3 rain
        delays during this game.
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
