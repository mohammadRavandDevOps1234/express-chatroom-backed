SELECT `Order`.`id`,
    `Order`.`address`,
    `Order`.`createdAt`,
    `Order`.`updatedAt`,
    `products`.`id` AS `products.id`,
    `products`.`name` AS `products.name`,
    `products->productOrders`.`id` AS `products.productOrders.id`,
    `products->productOrders`.`qty` AS `products.productOrders.qty`
FROM `Orders` AS `Order`
    LEFT OUTER JOIN (
        `ProductOrders` AS `products->productOrders`
        INNER JOIN `Products` AS `products` ON `products`.`id` = `products->productOrders`.`productId`
    ) ON `Order`.`id` = `products->productOrders`.`orderId`