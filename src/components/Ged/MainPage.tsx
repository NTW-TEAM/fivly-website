"use client";
import CardDocument from "./CardDocument";
import ChartStockage from "./ChartStockage";
import TableDocument from "./TableDocument";

interface CardDocumentData {
  title: string;
  size: string;
  dateImport: string;
  userImport: string;
}

const cardDocumentData: CardDocumentData[] = [
  {
    title: "Document1.pdf",
    size: "1.5 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
  {
    title: "Document2.pdf",
    size: "1.5 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
  {
    title: "Document3.pdf",
    size: "1.5 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
  {
    title: "Document4.pdf",
    size: "1.5 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
  {
    title: "Document5.pdf",
    size: "1.5 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
  {
    title: "Document6.pdf",
    size: "1.5 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
  {
    title: "Document7.pdf",
    size: "1.5 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
  {
    title: "Document8.pdf",
    size: "1.5 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
  {
    title: "Document9.pdf",
    size: "1.5 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  },
  {
    title: "Document10.pdf",
    size: "1.5 Mo",
    dateImport: "12/12/2021",
    userImport: "Admin",
  }
];

const MainPage = () => {
  return (
    <div className="col-span-4 space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-2 2xl:gap-7.5">
        <ChartStockage />

        <div className="flex sm:max-w-[calc(100vw-30rem)] flex-nowrap gap-3 overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-primary">
          {cardDocumentData.map((data, index) => (
            <CardDocument
              key={index}
              title={data.title}
              size={data.size}
              dateImport={data.dateImport}
              userImport={data.userImport}
            />
          ))}
        </div>

      </div>
        <TableDocument />
    </div>
  );
};

export default MainPage;
