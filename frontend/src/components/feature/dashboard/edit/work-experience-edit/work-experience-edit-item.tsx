import DeleteButton from "@/components/button/delete-button";
import EditWorkExperienceForm from "@/components/feature/form/dashboard/edit-form/edit-work-experience-form";

export function WorkExperienceEditItem() {
  return (
    <div className="flex flex-col items-center border rounded-lg">
      <div className="flex items-center w-full ">
        <div className="min-w-1/4 border-r h-[50px] items-center flex justify-center px-2">
          <h4 className="font-bold text-primary text-lg">Position</h4>
        </div>
        <div className=" w-full h-[50px] items-center flex px-2 ">
          <span className="line-clamp-1">
            dgyagsdhgashgdhsagd hsaghdghsaghdgsahdhsa
          </span>
        </div>
      </div>
      <div className="flex items-center w-full border-t">
        <div className="min-w-1/4 border-r h-[50px] items-center flex justify-center px-2">
          <h4 className="font-bold text-primary text-lg">Company Name</h4>
        </div>
        <div className=" w-full h-[50px] items-center flex px-2 ">
          <span className="line-clamp-1">
            dgyagsdhgashgdhsag dhsaghdghsaghdgsahdhsa
          </span>
        </div>
      </div>
      <div className="flex items-center border-t w-full">
        <div className="flex items-center w-1/2 border-r">
          <div className=" h-[50px] w-1/3 items-center flex justify-center border-r px-2">
            <h4 className="font-bold text-primary text-lg">Year</h4>
          </div>
          <div className="w-full h-[50px] items-center flex px-2 justify-center ">
            <time className="line-clamp-1" dateTime="">
              2022 - 2023
            </time>
          </div>
        </div>
        <div className="flex items-center w-1/2">
          <div className=" h-[50px] w-1/2 items-center flex justify-center  border-r px-2">
            <h4 className="font-bold text-primary text-lg">Work Arrangement</h4>
          </div>
          <div className=" w-1/2 h-[50px] items-center flex px-2 justify-center ">
            <span className="line-clamp-1"> fulltime </span>
          </div>
        </div>
      </div>
      <div className="flex items-center w-full border-t">
        <div className="min-w-1/4 border-r h-[50px] items-center flex justify-center px-2">
          <h4 className="font-bold text-primary text-lg">Tech List</h4>
        </div>
        <div className=" w-full h-[50px] items-center flex px-2 ">
          <span className="line-clamp-1">dasdsa dasdas dasdsa dsadsa</span>
        </div>
      </div>
      <div className="flex px-2 flex-col w-full border-t">
        <div className=" h-[50px] items-center flex">
          <h4 className="font-bold text-primary text-lg">Desciption:</h4>
        </div>
        <div className="border rounded-lg p-2 bg-background">
          <ul className="list-disc list-inside">
            <li className="leading-relaxed">aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa aaaaaaaaaaa</li>
            <li className="leading-relaxed">aaaaaaaaaaa</li>
            <li className="leading-relaxed">aaaaaaaaaaa</li>
            <li className="leading-relaxed">aaaaaaaaaaa</li>
          </ul>
        </div>
      </div>
      <div className="flex items-center w-full justify-center gap-4 py-4">
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
