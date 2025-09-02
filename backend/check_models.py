from openai import OpenAI

client = OpenAI(
    api_key="bda7d8b9-7a8d-4c9f-9beb-d94fe5be7cb5",
    base_url="https://api-llm-factory.ai.uky.edu"  # <-- no /v1 here
)

models = client.models.list()

for m in models.data:
    print(m.id)
