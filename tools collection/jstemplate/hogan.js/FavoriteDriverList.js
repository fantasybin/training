var tmpl = ['<table id="driver_list_table" class="list_table tdac" border="0" width="100%">',
		'<tr>',
			'<th >司机信息</th>',
			'<th >评价星级</th>',
			'<th >城市</th>',
			'<th >目前驾驶车型</th>',
			'<th >为您服务过次数</th>',
			'<th >操作</th>',
		'</tr>',
		'{{#list}}',
		'<tr class="js_row">',
			'<td>{{name}}</td>',
			'<td width="110px;"><div class="m_star"><div class="in" style="width:{{starsCount}}%;"></div></div></td>',
			'<td>{{city}}</td>',
			'<td>{{carType}}</td>',
			'<td>{{serviceCount}}</td>',
			'<td class="ac pl25">',
				'<a class="js_delete" data-id="{{id}}" href="javascript:void(0);" class="gray">删除</a>',
			'</td>',
		'</tr>',
		'{{/list}}',
	'</table>'].join('');