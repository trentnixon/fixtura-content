import { BUTTON_FUNC } from "@/components/UI/buttons";
import { Table, Badge, Avatar } from "@mantine/core";

const SingleFixtureResultTable = ({ filteredAssets, onSelectFixture }) => {
  return (
    <Table striped highlightOnHover>
      <thead>
        <tr>
          <th></th>
          <th>Fixture</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredAssets.map((asset) => (
          <tr key={asset.id}>
            {/* Avatar Image */}
            <td>
              <Avatar src={asset.url} alt={asset.name} size={60} radius="md" />
            </td>
            {/* Match Identifier */}
            <td>{asset.structuredOutput?.match_identifier || "No Match"}</td>

            {/* Processed Status */}
            <td>
              {asset.hasCompleted ? (
                <Badge color="green">Processed</Badge>
              ) : (
                <Badge color="yellow">Not Processed</Badge>
              )}
            </td>

            {/* Error Status */}
            <td>
              {asset.hasError ? (
                <Badge color="red">Error</Badge>
              ) : (
                <Badge color="green">No Error</Badge>
              )}
            </td>

            {/* Actions */}
            <td>
              <BUTTON_FUNC
                Label="View"
                onClick={() => onSelectFixture(asset.id)} // Pass the ID instead of the index
                size="xs"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SingleFixtureResultTable;
