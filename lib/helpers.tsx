import { useState } from 'react';

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();

  return `${dd}/${mm}/${yyyy}`;
};

export const formatMetaDescription = (markdownText: string) => {
  const regEx = /^(?!#) *((?:\S+( |$)+){1,20})/gm;
  return markdownText.match(regEx);
};

export const usePagination = (resultList: any[], pageSize: number = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleResults, setVisibleResults] = useState<any>(null);
  const totalPages = Math.ceil(resultList.length / pageSize);

  const getResults = (pageNumber: number, results: any = resultList) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = (pageNumber - 1) * pageSize + pageSize;
    const selectedResults = results.slice(startIndex, endIndex);

    setVisibleResults(selectedResults);
  };

  const pageForwards = () => {
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

    setCurrentPage(nextPage);
  };

  const pageBackwards = () => {
    const previousPage = currentPage > 1 ? currentPage - 1 : 1;

    setCurrentPage(previousPage);
  };

  return {
    getResults,
    currentPage,
    totalPages,
    visibleResults,
    pageForwards,
    pageBackwards,
  };
};
