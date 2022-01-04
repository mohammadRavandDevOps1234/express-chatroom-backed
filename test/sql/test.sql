SELECT `id`,
    `AgencyId`,
    `province`,
    `city`,
    `region`,
    `createdAt`,
    `updatedAt`
FROM `AgencyActivities` AS `AgencyActivity`
WHERE (
        `AgencyActivity`.`AgencyId` != '85b9d41f-5f72-4907-adc5-f96e718b4854'
        AND `AgencyActivity`.`province` != 8
        AND `AgencyActivity`.`city` != 117
        AND `AgencyActivity`.`region` != 22
    )
LIMIT 1;