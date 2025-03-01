const jurusan = [
    { 
        id: 1, 
        route: "/alumni-akuntansi", 
        sqlQuery: "SELECT * FROM data_alumni WHERE `jurusan_prodi` = 'akuntansi' LIMIT ? OFFSET ?",
        totalData: "SELECT COUNT(*) AS total FROM data_alumni WHERE `jurusan_prodi` = 'akuntansi'"
    },
    { 
        id: 2, 
        route: "/alumni-elektro", 
        sqlQuery: "SELECT * FROM data_alumni WHERE `jurusan_prodi` = 'teknik elektro' LIMIT ? OFFSET ?",
        totalData: "SELECT COUNT(*) AS total FROM data_alumni WHERE `jurusan_prodi` = 'teknik elektro'"
    },
    { 
        id: 3, 
        route: "/alumni-informatika", 
        sqlQuery: "SELECT * FROM data_alumni WHERE `jurusan_prodi` = 'teknik informatika' LIMIT ? OFFSET ?",
        totalData: "SELECT COUNT(*) AS total FROM data_alumni WHERE `jurusan_prodi` = 'teknik informatika'"
    },
    { 
        id: 4, 
        route: "/alumni-manajemen", 
        sqlQuery: "SELECT * FROM data_alumni WHERE `jurusan_prodi` = 'manajemen' LIMIT ? OFFSET ?",
        totalData: "SELECT COUNT(*) AS total FROM data_alumni WHERE `jurusan_prodi` = 'manajemen'"
    },
    { 
        id: 5, 
        route: "/alumni-mesin", 
        sqlQuery: "SELECT * FROM data_alumni WHERE `jurusan_prodi` = 'teknik mesin' LIMIT ? OFFSET ?",
        totalData: "SELECT COUNT(*) AS total FROM data_alumni WHERE `jurusan_prodi` = 'teknik mesin'"
    },
    { 
        id: 6, 
        route: "/alumni-pai", 
        sqlQuery: "SELECT * FROM data_alumni WHERE `jurusan_prodi` = 'pendidikan agama islam' LIMIT ? OFFSET ?",
        totalData: "SELECT COUNT(*) AS total FROM data_alumni WHERE `jurusan_prodi` = 'pendidikan agama islam'"
    },
    { 
        id: 7, 
        route: "/alumni-ppkn", 
        sqlQuery: "SELECT * FROM data_alumni WHERE `jurusan_prodi` = 'ppkn' LIMIT ? OFFSET ?",
        totalData: "SELECT COUNT(*) AS total FROM data_alumni WHERE `jurusan_prodi` = 'ppkn'"
    },
    { 
        id: 8, 
        route: "/alumni-sastra-jepang", 
        sqlQuery: "SELECT * FROM data_alumni WHERE `jurusan_prodi` = 'sastra jepang' LIMIT ? OFFSET ?",
        totalData: "SELECT COUNT(*) AS total FROM data_alumni WHERE `jurusan_prodi` = 'sastra jepang'"
    },
    { 
        id: 9, 
        route: "/alumni-sastra-korea", 
        sqlQuery: "SELECT * FROM data_alumni WHERE `jurusan_prodi` = 'sastra korea' LIMIT ? OFFSET ?",
        totalData: "SELECT COUNT(*) AS total FROM data_alumni WHERE `jurusan_prodi` = 'sastra korea'"
    },
    { 
        id: 10, 
        route: "/alumni-sastra-prancis", 
        sqlQuery: "SELECT * FROM data_alumni WHERE `jurusan_prodi` = 'sastra prancis' LIMIT ? OFFSET ?",
        totalData: "SELECT COUNT(*) AS total FROM data_alumni WHERE `jurusan_prodi` = 'sastra prancis'"
    },
];

module.exports = jurusan;