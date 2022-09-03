import React from 'react'
import { Select } from "antd";
import { EnumHistory, ConvertStatus } from "../../utils/Common";

interface HistoryHeaderDocument {
  status: string;
  handleSelect(value: string): void;
}

const { Option } = Select;

const HistoryHeader = ({ status, handleSelect }: HistoryHeaderDocument) => {
  const handleClickSelect = (value: string) => {
    handleSelect(value);
  }

  return (
    <div className="history__header">
      <h3 className="history__header__title">LỊCH SỬ MUA HÀNG</h3>
      <Select defaultValue={status} style={{ width: 150 }} onChange={handleClickSelect}>
        <Option value="all">Tất cả</Option>
        {
          EnumHistory.map(item => {
            return (
              <Option key={item.id} value={item.status}>{ConvertStatus(item.status)}</Option>
            )
          })
        }
      </Select>
    </div>
  )
}

export default HistoryHeader
