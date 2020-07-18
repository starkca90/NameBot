module.exports = {
    selection: {
        "contentType": "application/vnd.microsoft.card.adaptive",
        "content": {
			"$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
			"type": "AdaptiveCard",
			"version": "1.2",
			"body": [
				{
					"type": "Container",
					"items": [
						{
							"type": "TextBlock",
							"text": "You Have Been Selected!",
							"weight": "Bolder",
							"size": "Medium"
						},
						{
							"type": "ColumnSet",
							"columns": [
								{
									"type": "Column",
									"width": "auto",
									"items": [
										{
											"type": "Image",
											"url": "${user.avatar}",
											"size": "Small",
											"style": "Person"
										}
									]
								},
								{
									"type": "Column",
									"width": "stretch",
									"items": [
										{
											"type": "TextBlock",
											"text": "${user.displayName}",
											"weight": "Bolder",
											"wrap": true
										}
									]
								}
							]
						}
					]
				},
				{
					"type": "Container",
					"items": [
						{
							"type": "TextBlock",
							"text": "As luck would have it, you have been selected for something... Congratulations!",
							"wrap": true
						},
						{
							"type": "FactSet",
							"facts": [
								{
									"$data": "${properties}",
									"title": "${key}",
									"value": "${value}"
								}
							]
						}
					]
				}
			]
		}
	}
}