import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function UserEdit() {
  return (
    <div>
      <div className="w-full table-scroll overflow-x-auto">
        <table className="w-full text-center min-w-[500px]">
          <thead>
            <tr className=" text-xl font-bold border-b text-primary text-center">
              <th className="p-2 border w-[100px]">Name</th>
              <th className="p-2 border w-[150px]">Email</th>
              <th className="p-2 border w-[150px]">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border ">Nhat Trung</td>
              <td className="p-2 border">nhattrung@gmail.com</td>
              <td className="p-2 border flex justify-center items-center">
                <Select>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue
                      placeholder="Select role"
                      defaultValue="Admin"
                    />
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </td>
            </tr>
            <tr>
              <td className="p-2 border ">Nam</td>
              <td className="p-2 border">nam@gmail.com</td>
              <td className="p-2 border flex justify-center items-center">
                <Select>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue
                      placeholder="Select role"
                      defaultValue="User"
                    />
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
