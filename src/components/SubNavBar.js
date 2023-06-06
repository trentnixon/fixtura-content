import { SelectARender } from "@/components/SelectARender"
import { FindAccountLabel } from "@/utils/actions"
import { getAccount } from "@/api/accounts";
export const SubNavbar = async (props)=>{
    const {PATH, DATA} = props
    const account = await getAccount(PATH);
    if (!account) {
      return <p>Loading...</p>; // Or some loading spinner
    }
    return(
        <header className="bg-white shadow">
        <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {FindAccountLabel(account)}
          </h1>
          
          <SelectARender PATH={PATH} DATA={DATA} />
        </div>
      </header>
    )
}