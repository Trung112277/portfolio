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
      <div>
        <table className="w-full text-center">
          <thead>
            <tr className=" text-xl font-bold border-b">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
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
