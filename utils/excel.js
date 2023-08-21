import XLSX from 'xlsx-js-style';

export const DEFAULT_BORDER_OPTIONS = {
    top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' },
};

export const exportToExcel = async ({ sheetData, sheetName }) => {
    const workBook = XLSX.utils.book_new();
    const writeOpts = {
        type: 'base64',
        cellDates: true,
        bookSST: false,
        bookType: 'xlsx',
        compression: false,
    };
    // eslint-disable-next-line no-restricted-syntax
    // for (const [index, sheet] of workSheets.entries()) {
    XLSX.utils.book_append_sheet(workBook, sheetData, sheetName);
    // }
    // XLSX.utils.book_append_sheet(workBook, sheetData, sheetName);
    const anchorHref = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${XLSX.write(workBook, writeOpts)}`;
    const a = document.createElement('a');
    a.href = anchorHref;
    a.download = `${sheetName}.xlsx`;
    document.body.appendChild(a);
    a.click();
};

export const exportExcel = async (title, date, headers, rows, width, merge, fileName, totals) => {
    const titleSheet = [
        [{ v: title, s: { alignment: { horizontal: 'center' }, font: { bold: true, name: 'Times New Roman', sz: '18' } } }],
    ];

    const dateSheet = [
        [{ v: date, s: { alignment: { horizontal: 'center' }, font: { name: 'Times New Roman', sz: '12' } } }],
    ];
    rows.unshift(headers);
    const workSheet = XLSX.utils.aoa_to_sheet([[]]);
    XLSX.utils.sheet_add_aoa(workSheet, titleSheet, { origin: 'A2' });
    XLSX.utils.sheet_add_aoa(workSheet, dateSheet, { origin: 'A3' });
    const totalSheet = [[]];
    if (totals) {
        totals.forEach((total) => {
            totalSheet[0].push({ v: total, s: { alignment: { horizontal: 'left' }, font: { bold: true, name: 'Times New Roman', sz: '12' } } });
            totalSheet[0].push({});
        });
        XLSX.utils.sheet_add_aoa(workSheet, totalSheet, { origin: 'A5' });
    }

    XLSX.utils.sheet_add_aoa(workSheet, rows, { origin: `A${totals ? 7 : 5}` });
    const wsColsOpts = width;
    const merges = merge;
    workSheet['!cols'] = wsColsOpts;
    workSheet['!rows'] = [{}, { hpx: 30 }];
    workSheet['!merges'] = merges;
    // eslint-disable-next-line no-return-await
    return await exportToExcel({ sheetData: workSheet, sheetName: fileName });
};

export const exportExcelMultiple = async (title, date, tables, merge, fileName, totals) => {
    const titleSheet = [
        [{ v: title, s: { alignment: { horizontal: 'center' }, font: { bold: true, name: 'Times New Roman', sz: '18' } } }],
    ];

    const dateSheet = [
        [{ v: date, s: { alignment: { horizontal: 'center' }, font: { name: 'Times New Roman', sz: '12' } } }],
    ];
    const workSheet = XLSX.utils.aoa_to_sheet([[]]);
    XLSX.utils.sheet_add_aoa(workSheet, titleSheet, { origin: 'A2' });
    XLSX.utils.sheet_add_aoa(workSheet, dateSheet, { origin: 'A3' });
    let rowProcessing = totals ? 7 : 5;
    const merges = merge;
    const totalSheet = [[]];

    if (totals) {
        totals.forEach((total) => {
            totalSheet[0].push({ v: total, s: { alignment: { horizontal: 'left' }, font: { bold: true, name: 'Times New Roman', sz: '12' } } });
            totalSheet[0].push({});
        });
        XLSX.utils.sheet_add_aoa(workSheet, totalSheet, { origin: 'A5' });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const table of tables) {
        const subTitle = [
            [{ v: table.subTitle, s: { alignment: { horizontal: 'left' }, font: { bold: true, name: 'Times New Roman', sz: '14' } } }],
        ];
        table.rows.unshift(table.headers);
        XLSX.utils.sheet_add_aoa(workSheet, subTitle, { origin: `A${rowProcessing}` });
        XLSX.utils.sheet_add_aoa(workSheet, table.rows, { origin: `A${rowProcessing + 1}` });
        const wsColsOpts = table.width;
        merges.push({ s: { r: rowProcessing - 1, c: 0 }, e: { r: rowProcessing - 1, c: 1 } });
        workSheet['!cols'] = wsColsOpts;
        rowProcessing += table.rows.length + 3;
    }
    workSheet['!rows'] = [{}, { hpx: 30 }];
    workSheet['!merges'] = merges;
    // eslint-disable-next-line no-return-await
    return await exportToExcel({ sheetData: workSheet, sheetName: fileName });
};
