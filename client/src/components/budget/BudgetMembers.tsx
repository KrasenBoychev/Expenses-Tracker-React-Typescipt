import { useEffect, useState } from "react";
import type { BudgetInterface, MemberInterface } from "../../interfaces/budget";
import toast from "react-hot-toast";
import {
  createNewMember,
  getMembers,
  removeMember,
} from "../../api/expenses-api";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface BudgetMembersProps {
  budget: BudgetInterface | null;
  setBudget: Function;
}

export default function BudgetMembers({
  budget,
  setBudget,
}: BudgetMembersProps) {
  const [allMembers, setAllMembers] = useState<MemberInterface[]>([]);
  const [newMember, setNewMember] = useState<string>("");
  const authData = useAuthContext();
  const { userId, changeAuthState } = authData;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const getMembersRes = await getMembers(budget!.members);
        setAllMembers(getMembersRes);
      } catch (e: unknown) {
        if (e instanceof Error) {
          return toast.error(e.message);
        }
      }
    })();
  }, []);

  const addNewMemberHandler = async () => {
    if (newMember == "") {
      return;
    }

    const existingMember = allMembers.find(
      (member) => member.email == newMember
    );
    if (existingMember) {
      toast.error("Member already exists!");
      return;
    }

    try {
      const newMemberInfo = await createNewMember(newMember, budget!._id);
      setBudget((budget: BudgetInterface) => {
        budget.members.push(newMemberInfo);
        return budget;
      });
      setAllMembers((prevMembers) => [...prevMembers, newMemberInfo]);
      setNewMember("");
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error(JSON.parse(e.message));
      }
    }
  };

  const removeMemberHandler = async (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      id: string;
    };
    const memberId = target.id;
    try {
      await removeMember(memberId, budget!._id);
      setBudget((budget: BudgetInterface) => {
        budget.members = budget.members.filter((member) => member !== memberId);
        return budget;
      });

      setAllMembers(allMembers.filter((member) => member._id !== memberId));

      if (memberId == userId) {
        authData.budgets = authData.budgets.filter((b) => b !== budget!._id);
        changeAuthState(authData);
        navigate("/");
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        return toast.error(e.message);
      }
    }
  };
  return (
    <div className="flex flex-col w-full mt-10 ml-[150px] mx-auto p-2 bg-gray-100 text-black">
      <h3 className="w-[100%] p-3 text-xl text-center border-b-1 border-black">
        All Members
      </h3>
      <ul className="flex flex-col gap-2 p-3" data-testid="budget-members-ul">
        <li className="flex justify-between gap-2">
          <input
            type="text"
            className="w-[80%] h-7 rounded"
            value={newMember}
            onChange={(e) => setNewMember(e.target.value)}
            data-testid="budget-members-input"
          />
          <button
            className="w-[70px] py-1 px-2 bg-green-300 rounded"
            onClick={addNewMemberHandler}
            data-testid="budget-members-button"
          >
            add
          </button>
        </li>
        {allMembers.map((member, index) => (
          <li
            key={index}
            className="flex justify-between gap-2 hover:opacity-50"
          >
            <span>{member.email}</span>
            <button
              className="w-[70px] py-1 px-2 bg-red-300 rounded"
              id={member._id}
              onClick={removeMemberHandler}
              data-testid={member._id}
            >
              {member._id == userId ? "leave" : "remove"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
