import { SelectARender } from "@/components/SelectARender";
import { FindAccountLabel, DateFromTo } from "@/utils/actions";
import { getAccount } from "@/api/accounts";

export const SubNavbar = async (props) => {
  const { PATH, DATA } = props;
  const account = await getAccount(PATH);
  console.log(account?.attributes.scheduler.data);
 
  return (
    <header className="bg-white shadow">
      <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {FindAccountLabel(account)}
          </h1>
          <p className="font-bold  text-xs ">
            this date is wrong, it needs to be the render date.
            Selected Dates: {DateFromTo(account.attributes.createdAt)}
          </p>
          <div className="flex justify-between mx-auto max-w-7xl px-1 py-1">
            <div className="stats">
              <div className="stat place-items-start p-2">
                <div className="stat-title">Matches</div>
                <div className="stat-title">0</div>
              </div>

              <div className="stat place-items-start  p-2">
                <div className="stat-title">Writeups</div>
                <div className="stat-title">0</div>
              </div>

              <div className="stat place-items-start  p-2">
                <div className="stat-title">Videos </div>
                <div className="stat-title">0</div>
              </div>
              <div className="stat place-items-start  p-2">
                <div className="stat-title">Images </div>
                <div className="stat-title">0</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <SelectARender PATH={PATH} DATA={DATA} />
        </div>
      </div>
    </header>
  );
};
