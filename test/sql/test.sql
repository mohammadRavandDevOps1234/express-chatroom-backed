SELECT `Store`.`id`,
    `Store`.`UserId`,
    `Store`.`store_name`,
    `Store`.`store_lat`,
    `Store`.`store_lng`,
    `Store`.`province_id`,
    `Store`.`city_id`,
    `Store`.`region_id`,
    `Store`.`createdAt`,
    `Store`.`updatedAt`,
    `ConsumerStores`.`createdAt` AS `ConsumerStores.createdAt`,
    `ConsumerStores`.`updatedAt` AS `ConsumerStores.updatedAt`,
    `ConsumerStores`.`ConsumerId` AS `ConsumerStores.ConsumerId`,
    `ConsumerStores`.`StoreId` AS `ConsumerStores.StoreId`
FROM `Stores` AS `Store`
    INNER JOIN `ConsumerStores` AS `ConsumerStores` ON `Store`.`id` = `ConsumerStores`.`StoreId`
    AND `ConsumerStores`.`ConsumerId` = '08563b69-7591-49ed-acbb-83091d5bd04b';