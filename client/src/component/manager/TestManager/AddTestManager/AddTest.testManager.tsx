import { Input, Select } from "antd";

export const AddTest = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <div>
      <p>Tên bài test</p>
      <Input placeholder="Điền tên bài test"></Input>
      <div className="flex gap-5">
        <div>
          <label htmlFor="">Danh mục</label>
          <br />
          <Select
            defaultValue="Chọn danh mục"
            style={{ width: 150 }}
            onChange={handleChange}
            options={[{ value: "jack", label: "Jack" }]}
          />
        </div>
        <div>
          <label htmlFor=""> Thời gian (phút)</label>
          <br />
          <Input className="!w-20"></Input>
        </div>
      </div>
    </div>
  );
};
