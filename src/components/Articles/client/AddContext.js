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
        description="here"
        autosize
        minRows={10}
        value={gameContext}
        onChange={(e) => setGameContext(e.target.value)}
      />
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
