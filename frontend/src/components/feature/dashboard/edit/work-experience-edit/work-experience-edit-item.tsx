import DeleteButton from "@/components/button/delete-button";
import EditWorkExperienceForm from "@/components/feature/form/dashboard/edit-form/edit-work-experience-form";

export function WorkExperienceEditItem() {
  return (
    <div className="flex flex-col items-center border rounded-lg">
      <div className="flex items-center w-full ">
        <div className="w-[200px] border-r min-h-[50px] items-center flex justify-center px-2">
          <h4 className="font-bold text-primary text-lg text-center">
            Position
          </h4>
        </div>
        <div className=" w-full min-w-[calc(100%-200px)] min-h-[50px] items-center flex px-2 ">
          <span className="truncate">
            dgyagsdhgashgdhsagd hsaghdghsaghdgsahdhsa
          </span>
        </div>
      </div>
      <div className="flex items-center w-full border-t">
        <div className="w-[200px] border-r min-h-[50px] items-center flex justify-center px-2">
          <h4 className="font-bold text-primary text-lg text-center">
            Company Name
          </h4>
        </div>
        <div className=" w-full min-w-[calc(100%-200px)] min-h-[50px] items-center flex px-2 ">
          <span className="truncate">
            dgyagsdhgashgdhsag dhsaghdghsaghdgsahdhsa
          </span>
        </div>
      </div>
      <div className="flex items-center border-t w-full">
        <div className=" min-h-[50px] w-[200px] items-center flex justify-center border-r px-2">
          <h4 className="font-bold text-primary text-lg text-center">Year</h4>
        </div>
        <div className="w-full min-w-[calc(100%-200px)] min-h-[50px] items-center flex px-2">
          <time className="truncate" dateTime="">
            2022 - 2023
          </time>
        </div>
      </div>
      <div className="flex items-center w-full border-t">
        <div className="w-[200px] border-r min-h-[50px] items-center flex justify-center px-2">
          <h4 className="font-bold text-primary text-lg text-center">
            Work Arrangement
          </h4>
        </div>
        <div className=" w-full min-w-[calc(100%-200px)] min-h-[50px] items-center flex px-2 ">
          <span className="truncate">fulltime</span>
        </div>
      </div>
      <div className="flex items-center w-full border-t">
        <div className="w-[200px] border-r min-h-[50px] items-center flex justify-center px-2">
          <h4 className="font-bold text-primary text-lg text-center">
            Tech List
          </h4>
        </div>
        <div className=" w-full min-w-[calc(100%-200px)] min-h-[50px] items-center flex px-2 ">
          <span className="truncate">dasdsa dasdas dasdsa dsadsa</span>
        </div>
      </div>
      <div className="flex px-2 flex-col w-full border-t">
        <div className=" min-h-[50px] items-center flex">
          <h4 className="font-bold text-primary text-lg text-center">
            Desciption:
          </h4>
        </div>
        <div className="border rounded-lg p-2 bg-background">
          <ul className="list-disc list-inside">
            <li className="leading-relaxed">
              aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa
              aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa
            </li>
            <li className="leading-relaxed">aaaaaaaaaaa</li>
            <li className="leading-relaxed">aaaaaaaaaaa</li>
            <li className="leading-relaxed">aaaaaaaaaaa</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 w-full py-4">
        <EditWorkExperienceForm
          workExperienceId="1"
          initialData={{}}
          onUpdate={async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log("Work experience updated successfully");
          }}
        />
        <DeleteButton title="Work Experience" />
      </div>
    </div>
  );
}
