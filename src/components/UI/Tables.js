import { Table } from "@mantine/core"

/*

          <thead>
            <tr>
              <th>Dates</th>
              <th>From</th>
              <th>To</th>
              <th>View</th>
            </tr>
          </thead>

          <tbody>
            {RENDERS.sort(sortRenders).map((render, i) => {
              return (
                <tr key={`option_${i}`} id={render.id} value={render.id}>
                  <td>
                    <IconCalendar color={theme.colors.orange[7]} />
                  </td>
                  <td>{DateFromTo(render.attributes.createdAt)[0]}</td>
                  <td>{DateFromTo(render.attributes.createdAt)[1]}</td>
                  <td>
                    <Link passHref href={`/${params.id}/${render.id}`}>
                      <Button variant="outline">Review</Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
  
*/
export const FixturaTableOuter = (props)=>{
    return(
        <Table>{props.children}</Table>
    )
}