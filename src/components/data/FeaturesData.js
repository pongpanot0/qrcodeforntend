import React from 'react';

import { BsFillShieldLockFill ,BsFillHouseDoorFill} from 'react-icons/bs';
import { IoIosOptions } from 'react-icons/io';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { BiSupport, BiDollar } from 'react-icons/bi';

import { GrHostMaintenance } from 'react-icons/gr';
const iconStyle = (Icon) => <Icon size="3rem" color="#0f0f0f" />;

export const featuresData = [
	{
		name: 'Best Security',
		description: 'Professional Security Access',
		icon: iconStyle(BsFillHouseDoorFill),
		imgClass: 'one',
	},
	{
		name: 'Ease of Use',
		description: 'Our system is easy to use and integrate',
		icon: iconStyle(IoIosOptions),
		imgClass: 'two',
	},
	{
		name: 'Maintenance',
		description: 'Highest standards',
		icon: iconStyle(GrHostMaintenance),
		imgClass: 'three',
	},
	{
		name: '24/7 Support',
		description: 'Our team is available at all times in case you need us',
		icon: iconStyle(BiSupport),
		imgClass: 'four',
	},
	{
		name: 'Price',
		description: 'LowerPrice',
		icon: iconStyle(BiDollar),
		imgClass: 'five',
	},
	{
		name: 'Scalable',
		description:
			'Our servers are located all over the world, therefore improving scalability and speed ',
		icon: iconStyle(AiOutlineCloudUpload),
		imgClass: 'six',
	},
];