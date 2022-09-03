import React from 'react'
import { Layout } from "antd";

const { Footer } = Layout;

const contents = [
  {
    id: 1,
    title: "Chính sách",
    description: [
      { id: "d0", text: "Bảo mật thông tin" },
      { id: "d1", text: "Nhắc nhở người dùng" },
      { id: "d2", text: "Chính sách tin cậy" },
    ]
  },
  {
    id: 2,
    title: "Đối tác kinh doanh",
    description: [
      { id: "d0", text: "Liên kết với công ty" },
      { id: "d1", text: "Các tiểu thương nhỏ" },
      { id: "d2", text: "Các hộ gia dình" },
    ]
  },
  {
    id: 3,
    title: "Liên lạc",
    description: [
      { id: "d0", text: "Thông qua email" },
      { id: "d1", text: "Thông qua số điện thoại" },
      { id: "d2", text: "Thông qua đường dây nóng" },
    ]
  },
  {
    id: 4,
    title: "Về chúng tôi",
    description: [
      { id: "d0", text: "Thành lập năm 1999" },
      { id: "d1", text: "Cơ sở hàng đầu Việt Nam" },
      { id: "d2", text: "Độc quyền về sản phẩm" },
    ]
  },
]

const MyFooter = () => {
  return (
    <Footer>
      <div className="footer">
        <img className="footer__logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXObBjEVthbn9yxOAf7GDiiwNWilv44wVhZw&usqp=CAU"
          alt="logo"
        />
        {
          contents.map(content => {
            return (
              <div className="footer__col" key={content.id}>
                <ul className="footer__col__text">
                  <h1>{content.title}</h1>
                  {
                    content.description.map(value => {
                      return (
                        <li key={value.id}>{value.text}</li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
    </Footer>
  )
}

export default MyFooter
