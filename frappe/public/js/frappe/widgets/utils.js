frappe.provide('frappe.widget.utils');

function generate_grid(data) {
	function add(a, b) {
		return a + b;
	}

	const grid_max_cols = 6

	// Split the data into multiple arrays
	// Each array will contain grid elements of one row
	let processed = []
	let temp = []
	let init = 0
	data.forEach((data) => {
		init = init + data.columns;
		if (init > grid_max_cols) {
			init = data.columns
			processed.push(temp)
			temp = []
		}
		temp.push(data)
	})

	processed.push(temp)

	let grid_template = [];

	processed.forEach((data, index) => {
		let aa = data.map(dd => {
			return Array.apply(null, Array(dd.columns)).map(String.prototype.valueOf, dd.name)
		}).flat()

		if (aa.length < grid_max_cols) {
			let diff = grid_max_cols - aa.length;
			for (let ii = 0; ii < diff; ii++) {
				aa.push(`grid-${index}-${ii}`)
			}
		}

		grid_template.push(aa.join(" "))
	})
	let grid_template_area = ""

	grid_template.forEach(temp => {
		grid_template_area += `"${temp}" `
	})

	return grid_template_area
}

frappe.widget.utils = {
	build_summary_item: function(summary) {
		let df = { fieldtype: summary.datatype };
		let doc = null;

		if (summary.datatype == "Currency") {
			df.options = "currency";
			doc = { currency: summary.currency };
		}

		let value = frappe.format(summary.value, df, null, doc);
		let indicator = summary.indicator
			? `indicator ${summary.indicator.toLowerCase()}`
			: "";

		return $(
			`<div class="summary-item"><span class="summary-label small text-muted ${indicator}">${
				summary.label
			}</span><h1 class="summary-value">${value}</h1></div>`
		);
	},
};

export { generate_grid };
