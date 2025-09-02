import openai
import os

# Set your LLM Factory API key and base URL
client = openai.OpenAI(
    api_key="bda7d8b9-7a8d-4c9f-9beb-d94fe5be7cb5",  # 🔒 Make sure to secure this later!
    base_url="https://api-llm-factory.ai.uky.edu/v1"
)

def get_skincare_recommendation(quiz_answers, top_concerns):
    # Format the user input into a prompt
    skin_types = ", ".join(quiz_answers.get("skin_types", []))
    skin_concerns = ", ".join(quiz_answers.get("skin_concerns", []))
    concern_summary = ", ".join(top_concerns)

    prompt = (
        f"I have {skin_types.lower()} skin and my skin concerns include {skin_concerns.lower()}.\n"
        f"My most visible concerns are: {concern_summary.lower()}.\n"
        "Can you give me a step-by-step personalized skincare routine using beginner-friendly language?"
    )

    try:
        response = client.chat.completions.create(
            model="llama3-8b",  # LLM Factory’s default model
            messages=[
                {"role": "system", "content": "You are a kind and helpful skincare expert."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=600
        )

        return response.choices[0].message.content

    except Exception as e:
        return {"error": str(e)}
